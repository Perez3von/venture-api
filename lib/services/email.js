require('dotenv').config();
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(
  {
    host:'smtp.zoho.com',
    secure: true,
    port: 465,
    // secure:true,
    // service:process.env.EMAIL_SERVICE,
    auth:{
      user:process.env.USER_EMAIL,
      pass:process.env.USER_PASS
    }
  }
);


const sendInvite = (email, ventureTitle, guestLink, hostName) => {

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
        .center-item{
          text-align:center;
          word-break: break-word;
        }
        .invite-container{
          align-items: center;
          margin: 0.5rem;
          padding:1rem;
          width:60vw;
         
      }
      b{
          font-weight: bolder;
      }
      #venture-btn{
          background-color: rgba(255, 255, 255, 0.823);
          border-style: solid;
          border-radius: 0.5rem;
          border-width:2px;
          padding: 1rem;
          margin-bottom: 1rem;
          font-weight: bold;
          font-size:medium;
          margin-left:auto;
          margin-right:auto;
          
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
          display: flex;
          justify-content: center;
          align-items:center;
          width:60vw;
          color:black;
          align-self:center;
         
      }
      .invite-container>p{
        font-size:larger;
      }
      li{
        margin-top:10px;
        margin-bottom:10px;
      }
   
  
        </style>
    </head>
    <body>
        <section class="email-container ">
        <section class="invite-container">
        <h1 class='center-item'>Invitation To Join A Brainstorm 📨</h1>
        
        <h3 class='center-item'>
        You’ve been invited to participate in a 50 Ways to Lemonade brainstorm!  
        This is a 2-4 person scaffolded virtual brainstorm to help the initiator work through the 4 Pillars of their entrepreneurial story with the help of other great minds.
        </h3>
        <h4 class='center-item'>Click on “Brainstorm” button below to launch the 50 Ways to Lemonade thinkspace.  You may click on audio to hear the initiator's elevator pitch for additional context. </h4>
        <div class='directions-wrapper' >
        <h4>Here’s how the Thinkspace is set up for an asynchronous turn-based brainstorm:</h4>
         <ol>
         <li>Select the focus of your input:
         <ul>
         <li>“expand” = to build upon the prior commenter’s narrative to either provide more color/context</li>
         <li>“clarify” = to refine a prior statement you made, or to respond to someone’s misinterpretation</li>
         <li>“challenge “ = to thoughtfully express doubt with a reason provided, or to play devil’s advocate</li>
         <li>“diverge” = to pivot the brainstorm thread by swapping only 1 story pillar at a time</li>
         </ul>
         </li>
         <br>
         <li>Select which story pillar(problem, character, setting, solution) your input is primarily directed at to keep brainstorming comments specific and focused.
         <p><b>Examples:</b></p>
         <p ><b>CHALLENGE Problem</b> “I understand the general problem space you’re in, but it’s a huge problem.  What are the specific pain points you’re trying to address?”</p>
         <p ><b>EXPAND Solution</b> “since your product requires staff to understand how to interpret the data, perhaps you can add a service component to your offering and create a SAAS model?</p>
         <p > <b>CHALLENGE Character</b> “even though the pain point is real, I don’t believe folks realize the problem until it’s too late and therefore too late to purchase your product”</p>
         <p ><b>DIVERGE Character</b> “I wonder if instead of focusing on the pediatric market, there’s more demand on the geriatric market, as they have the same pain point, and are the user and the buyer”.</p>
         </li>
         </ol>
         </div>
         <h3 class='center-item'>Click here to join the brainstorm (If the initiator has invited multiple folks, the first 3 to join will participate).</h3>
        <form class='venture-form center-item' action=${guestLink}>
            <button id="venture-btn">Brainstorm!</button>
            
        </form>
        <p class='center-item'>Cheers, <br> Venture Team</p>
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




const sendNotification = (email, ventureTitle, username, chatroomLink) => {

  
  const options = {
  
    from:process.env.USER_EMAIL,
    to:email,
    subject:`${username} has posted a commment in ${ventureTitle}`,
    text:'some test',
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>

    .invite-container{
      text-align:center;
      word-break:break-word;
      align-items: center;
      margin: 0.5rem;
      padding:1rem;
      width:60vw;
     
  }
  b{
      font-weight: bolder;
  }
  #venture-btn{
      background-color: rgba(255, 255, 255, 0.823);
      border-style: solid;
      border-radius: 0.5rem;
      border-width:2px;
      padding: 1rem;
      margin-bottom: 1rem;
      font-weight: bold;
      font-size:medium;
      margin-left:auto;
      margin-right:auto;
      
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
      display: flex;
      justify-content: center;
      align-items:center;
      width:60vw;
      color:black;
      align-self:center;
     
  }
    

    </style>
</head>
<body>

<h2>${username} has posted a commment in ${ventureTitle}</h2>

         <h3><b>Remeber</b>, to select the focus of your input:
         <ul>
         <li>“expand” = to build upon the prior commenter’s narrative to either provide more color/context</li>
         <li>“clarify” = to refine a prior statement you made, or to respond to someone’s misinterpretation</li>
         <li>“challenge “ = to thoughtfully express doubt with a reason provided, or to play devil’s advocate</li>
         <li>“diverge” = to pivot the brainstorm thread by swapping only 1 story pillar at a time</li>
         </ul>
         </h3>
         <h3>Select which story pillar(problem, character, setting, solution) your input is primarily directed at to keep brainstorming comments specific and focused.
         <p><b>Examples:</b></p>
         <p><b>CHALLENGE Problem</b> “I understand the general problem space you’re in, but it’s a huge problem.  What are the specific pain points you’re trying to address?”</p>
         <p><b>EXPAND Solution</b> “since your product requires staff to understand how to interpret the data, perhaps you can add a service component to your offering and create a SAAS model?</p>
         <p><b>CHALLENGE Character</b> “even though the pain point is real, I don’t believe folks realize the problem until it’s too late and therefore too late to purchase your product”</p>
         <p><b>DIVERGE Character</b> “I wonder if instead of focusing on the pediatric market, there’s more demand on the geriatric market, as they have the same pain point, and are the user and the buyer”.</p>
         </h3>
        
         <h3>Each participant has up to 10 comments.  If there are more than 2 participants, you may make a respond w/o waiting for everyone to comment.</h3>
         <form action=${chatroomLink}>
            <button id="venture-btn">Brainstorm!</button>
        </form>
        <p>Cheers, <br> Venture Team</p>
  
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



const sendCompletedBrainstorm = (email, ventureTitle, chat) => {

  
  const options = {
  
    from:process.env.USER_EMAIL,
    to:email,
    subject:`${ventureTitle} has been completed by the host`,
    text:'',
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
<h2>Thank you for participating in this 50 Ways to Lemonade brainstorm session.  It is now complete, and your input has helped move the needle.</h2>
<h1>The chat has been exported for your records</h1>
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


module.exports = { sendInvite, sendExport, sendCompletedBrainstorm, sendNotification };

