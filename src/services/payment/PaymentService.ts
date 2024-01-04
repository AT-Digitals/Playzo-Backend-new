import { Orders } from "razorpay/dist/types/orders";
import { PaymentRequestDto } from "../../dto/payment/PaymentRequestDto";
import Razorpay from "razorpay";
import { Service } from "typedi";
import { VerifyRequestDto } from "../../dto/payment/VerifyRequestDto";
import crypto from "crypto";

@Service()
export default class PaymentService {

  async create(request: PaymentRequestDto) {
    try {
      const instance = new Razorpay({
        key_id: process.env.KEY_ID??"",
        key_secret: process.env.KEY_SECRET,
      });
  
      const options = {
        amount: request.amount * 100,
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex"),
        payment_capture: 1
      };
  
      instance.orders.create(options, (error, order) => {
        if (error) {
          console.log(error);
          return { message: "Something Went Wrong!" };
        }
        console.log("order",order);
        return { data: order };
      });
    } catch (error) {
      console.log(error);

      return { message: "Internal Server Error!" };
    }
    
  }

  async createOrder(request: PaymentRequestDto) {
    try {
      let finalOrder: Orders.RazorpayOrder | any = {};
      console.log("dndfhv");
      const instance = new Razorpay({
        key_id: process.env.KEY_ID??"",
        key_secret: process.env.KEY_SECRET,
      });
  
      const options = {
        amount: request.amount*100,
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex"),
        payment_capture: 1
      };
  
     await instance.orders.create(options, (error, order) => {
        if (error) {
          console.log(error);
          return { message: "Something Went Wrong!" };
        }
        console.log("order",order);
         
        finalOrder = order;
        
      });

    return finalOrder;

    } catch (error) {
      console.log(error);

      // return { message: "Internal Server Error!" };
    }

  }

async verifyPayment(req:VerifyRequestDto) {
    try {
      const sign = req.orderId + "|" + req.paymentId;
      const expectedSign = crypto
        .createHmac("sha256", "TPX6eMdNAuxM86xdHdtDFvjp"??"")
        .update(sign.toString())
        .digest("hex");
  
      if (req.signature === expectedSign) {
        return { message: "Payment verified successfully",
      data:{
        paymentId:req.paymentId
      } };
      } else {
        return { message: "Invalid signature sent!" };
      }
    } catch (error) {
      console.log(error);

      return { message: "Internal Server Error!" };
    }

  }

  async refundPayment(req:any) {

      try {
        //first validate the payment Id then call razorpay API
        const instance = new Razorpay({
          key_id: process.env.KEY_ID??"",
        key_secret: process.env.KEY_SECRET,
        });
        // const options = {
        //     payment_id: req.paymentId,
        //     amount: req.amount,
        // };
        // const razorpayResponse = await instance.refunds(options);
        const razorpayResponse = await instance.payments.refund(req.paymentId,{
          "amount": req.amount,
          // "speed": "normal",
          // "notes": {
          //   "notes_key_1": "Beam me up Scotty.",
          //   "notes_key_2": "Engage"
          // },
          // "receipt": "Receipt No. 31"
        });
        //we can store detail in db and send the response
        return razorpayResponse;
    } catch (error) {
        console.log(error);
        return "Unable to refund the payment";
    }

 
  }
}
