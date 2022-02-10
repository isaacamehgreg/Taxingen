import { User } from "../User/user.entity"
import nodemailer from "nodemailer";

export const sendMail = async (userId:string, message:string, code:string) =>{
        const user = await User.findOne({id:userId})
        const email = user?.email
        //will triger send mail here
        var transporter = nodemailer.createTransport({
       // service: 'gmail',
        host:'smtp.gmail.com',
        secure:true,
        auth: {
                type:'OAUTH2',
                user: 'info@taxingen.com',
               // pass: 'Taxingen1970!@#$',
                serviceClient:'105402475137143410705',
                privateKey:"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC7aSIZ3cFPHWlK\n0rSsnLfiT9eY8R0OaM23rEugBS93iRacbQxvVhlFgfws1IJAef+PHRpgsPL1IvVn\nEaT5OsHwG7nuCItGZOsZ94YKrQwk2qyVFPBmEzHm7HsDreCxxUo8fh2GsUbPpZ8O\nOLqcJZ2U0Z+8j4okFdorMk2l63P/2YGn3EKzDi+uz5pR0bgfXzXLOqtNSrtAiSmC\nfBYKQG3EiA+6sLPnyvivbuU6gLzDtOXclTSLamvdkDCPBtJnjE+qvEzAWXskTRHG\nXS0h2qjpZF4dHTpHwhXMulQvLd53VvCa3yiH7XZXYjhe7K8o+1QiJMUWM/iKZXG2\n4hQn/GoBAgMBAAECggEADND0WqdJa5SlhhvOUt00Ag9w8G4EwHiDh2Nwyu4WQFF1\n5DEQIAkLGPxgd3X5vL90rgY3SJRK35K9crsuxTbmDmDtbSbU1EKQhV0VCjCqKCPZ\ny43I068AwzvTo2PGF8Ikzbakl3jftwTEUZ+ou1O8zz5d2YvjZ/MkN77THcNyHyi6\njDUafPUWsvo/Qi6gKnH014EE6ehozJfP4FU0Y2NGtjy2RidB/00WyCFPzJvRdGAm\nL2oRvqlHVqcuJmaK5QPvXMSnN0nx094XfjfZRI2KowMc2l62D3BxCqVcFenQUM0s\nsWbat+hyMtcpn3HZoN7tvL+KsKP8skIPzxDe7Ebs5QKBgQDklYTUZr0oaiig2cey\n2Wlzn81NK0qyk5k1LZlzWr6vgY3YoFjRjJJHSRYFB5RblQzvBdFqsLPjqj0doqiI\nVyjHw4YyqjGHB1ltp3JPPXBF44fdUGraV3sN6ERmOoD9KkwKiyr69GoAC+weoDcU\nOu+uAFezYZWDthED5ozZLxqmWwKBgQDR42uZoyDxDmFGU+lljPEO6ZlHzZe8/dRz\n87g+3+r/gkmppb4b2wctPBK2tik7RyBFvCqp7aQmnuil3v85lOTUKe0u+/xo/bwN\n455vd8u7LEh3qsfxBqa2pshSu+R3r3R8Mlgmp8sJ5irHVPnth57boEtWFD6lpDnO\nqLXDfeN30wKBgQDftwpaivbEsCl1S8+r1ibj19mplh40akp/BlLx2DVaNdSq2Dw1\nUnvzsq8PWxyzCUywPqR349sbjYjlEUYashsib9VOjs2MVwAKVuCEdyAD9q0JSGRb\nr1SrBtCysL1/iT8E7rGxDTcVNpXwX2OotAnR5VnwISig0LcUdzcQdI6DkwKBgQCg\nrJJgiOrc3n9FEVOo895N5jH7L74rZb1QDpFLQKtrclfl0QXZ2TCDRmulB4pE4Mwp\n1kRq1YtGLXw4DqAfeoY6jOYPg8PUs/lUQJ23A2QpI1tOkKSDNO5HASJ1g3UA0oY/\n1WJ6JRVfvJ2e/sRdO+c2hl1lxhW3RCMkuy56O1L5FQKBgEe1/g9Ymz/jpK9SV+dE\nfOkvwJMCLUS7koxUQjxGaTzC/WYarmEEbq7XYxl3MkIIZH2473tCquYN2McqX9QW\ntKJrU+l5XdUS/Ae8Bvh+WTDrDFUGNLkD1pYO5xjbNY9yvxdgY2MMJhpD0NE2UA3P\nNuBwT/49mOouwibwYRFV7paq\n-----END PRIVATE KEY-----\n"

        }
        });
        const mailOptions = {
                from: 'Taxingen', // sender address
                to: email, // list of receivers
                subject: 'Taxingen', // Subject line
                html: '<h3>Hello '+user?.first_name+'</h3><br><p>You have begin the process to register on Taxingen, </b> Follow this link, with this code to, complete you registeration process</p></b><h3>'+code+'</h3></b><p><a href="http://taxingen.com/company-registration/?code='+code+'&user_id:'+user?.id+'">Click Here To Verify</a></p>'
                };
                transporter.sendMail(mailOptions, function (err, info) {
                if(err)
                console.log(err)
                else
                console.log(info);
        });

       return email;
}