const nodeMailer = require('../config/nodemailer');

//Another way of exporting a method like module.exports = newComment
exports.newOTP = (otp,user) => {
    let htmlString = nodeMailer.renderTemplate({otp:otp},'/OTP/otp.ejs');
    
    nodeMailer.transporter.sendMail({
        from: 'akshatparagg@gmail.com',
        to:user,
        subject: "Password Reset",
        html: htmlString
    },(err,info) => {
        if(err){
            console.log('Error in sending mail',err);
            return;
        }

        //console.log('Message sent',info);
        return;
    });
}