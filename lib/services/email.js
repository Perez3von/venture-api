require('dotenv').config();
const nodemailer = require('nodemailer');

const sendInvite = (email, ventureTitle, guestLink, hostName) => {
  const transporter = nodemailer.createTransport(
    {
      service:process.env.EMAIL_SERVICE,
      auth:{
        user:process.env.USER_EMAIL,
        pass:process.env.USER_PASS
      }
    }
  );

  const options = {

    from:process.env.USER_EMAIL,
    to:email,
    subject:`Venture Chat Invitation to ${ventureTitle}`,
    text:`You were invited by ${hostName} to join ${ventureTitle} venture chat.
        Click 'Join' to access venture chat room`,
    html: `

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invitation</title>
        <style>
            .invite-container{
                background-color: rgb(255, 255, 255);
                align-items: center;
                border-radius: 0.5rem;
                margin: 0.5rem;
                padding:1rem;
                width:75vw;
               
            }
            b{
                font-weight: bolder;
            }
            #venture-btn{
                background-color: rgba(255, 255, 255, 0.823);
                border-style: solid;
                border-radius: 0.5rem;
                padding: 1rem;
                margin-bottom: 1rem;
                font-weight: bold;
                font-size:medium;
                
            }
            #venture-btn:hover{
                background-color: rgb(210, 209, 209);
        
            }
            h1{
                border-bottom: 1px;
                border-bottom-style: solid;
                border-color: #b70404;
                
            }
            .email-container{
                background-color:#b70404;
                display: flex;
                justify-content: center;
                align-items:center;
                border-radius: 1rem;
                width:75vw;
                color:black;
               
            }
        </style>
    </head>
    <body>
        <section class="email-container">
        <section class="invite-container">
        <h1>Invitation To Join A Venture 📨</h1>
        
        <h3>You were invited by <b>${hostName}</b> to chat room: <b>${ventureTitle}</b></h3>
        <h4>To join chat, click <i>' Access Chat '</i> button, to be redirected to ${ventureTitle}</h4>
        <form action=${guestLink}>
            <button id="venture-btn">Access Chat!</button>
        </form>
        <p>Cheers, <br> Venture Team</p>
        </section>
       
        
    </section>
    </body>
    </html>
     
        `,
        
    
  };

  transporter.sendMail(options, (err, info) => {
    if(err){
    //   console.log(err);
      return err;
    }
    // console.log(info.response);
    return info.response;
      
  });

};


const sendExport = (email, ventureTitle, chat, hostName) => {
  const transporter = nodemailer.createTransport(
    {
      service:process.env.EMAIL_SERVICE,
      auth:{
        user:process.env.USER_EMAIL,
        pass:process.env.USER_PASS
      }
    }
  );
  
  const options = {
  
    from:process.env.USER_EMAIL,
    to:email,
    subject:`Venture Chat Exported: ${ventureTitle}`,
    text:`You export ${ventureTitle} chat created by host ${hostName}.`,
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        table,
td {
    border: 1px solid #333;
}

thead,
tfoot {
    background-color: #333;
    color: #fff;
}

    </style>
</head>
<body>
<h1>Exported Chat</h1>
${chat}
</body>

</html>
    `,
          
      
  };
  
  transporter.sendMail(options, (err, info) => {
    if(err){
      console.log(err);
      return;
    }
    console.log(info.response);
        
  });
  
};


module.exports = { sendInvite, sendExport };

