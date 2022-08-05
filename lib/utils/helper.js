const renderTemplate = async (chat, title, host) => {

  const templateTitle = `<tr><th colspan="5"> Venture Name: ${title} </th></tr>`;
  const templateHost = `<tr><th colspan="5"> Host: ${host} </th></tr>`;
  const templateHeader = `  
    <tr>            
    <th colspan="1">Name</th>
    <th colspan="1">Pillar One</th>
    <th colspan="1">Pillar Two</th>
    <th colspan="1">Message</th>
    <th colspan="1">Time</th>
    </tr>`;
    
    
  let templateBody = '';
    
  chat.forEach(msg => {
    
    templateBody = templateBody + `  
        <tr>
        <td>${msg.username}</td>
        <td>${msg.pillarOne}</td>
        <td>${msg.pillarTwo}</td>
        <td>${msg.msg}</td>
        <td>${msg.time}</td>
        </tr>`;
    
  });
    
  const templateTable = `
    <table>
            <thead>
             ${templateTitle}
             ${templateHost}
             ${templateHeader}
            </thead>
            <tbody>
            ${templateBody}
            </tbody>
        </table>
    
    `;
    
  return templateTable;
    
};
module.exports = { renderTemplate };
