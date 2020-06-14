import axios from 'axios'

const baseUrl = 'http://api.ordrlo.com'

const ax = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {'Content-Type':'application/json'}
  });
  
const sendOtp = (body)=>{
    const {phone_number,new_user}=body;
     return ax.post(`/v1/api/send_otp`,
        {
            phone_number,
            new_user
        }
    )
}

const verifyOtpNewUser = (body)=>{
    const {first_name,last_name,email,pin,otp,role_id=1,phone_number} = body;
    return ax.post(`/v1/api/verify_otp`,
        {
            first_name,
            last_name,
            email,
            pin,
            otp,
            role_id,
            phone_number,
            "new_user" : true
        }
    )
}

const verifyOtpOldUser = (body)=>{
    const {pin,otp,role_id,phone_number} = body;
    return ax.post(`/v1/api/verify_otp`,
        {
            pin,
            otp,
            role_id,
            phone_number
        }
    )
}

export const loginService  = {sendOtp, verifyOtpNewUser,verifyOtpOldUser};
