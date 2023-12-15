exports.orderConfirmation = (data) => {
    const productListHTML = data.productsInfo.map(product => `
      <tr>
        <td>${product.productId.item}</td>
        <td>${product.quantity}</td>
        <td>${product.productId.price}</td>
      </tr>
    `).join('');
  
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          h1 {
            color: #333;
          }
          p {
            color: #666;
          }
          .order-details {
            margin-top: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }
          th, td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Order Confirmation</h1>
          <p>Dear ${data.customerId.name},</p>
          
          <p>Thank you for your order. We are pleased to confirm that your order has been received and is now being processed.</p>
          
          <div class="order-details">
            <h2>Order Details</h2>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                ${productListHTML}
              </tbody>
            </table>
            
            <p>Total: ${data.totalValue}</p>
          </div>
      
          <p>Your order will be shipped to the following address:</p>
          <address>
            ${data.customerId.address}
          </address>
      
          <p>If you have any questions about your order, please feel free to contact us at abc@support.com.</p>
      
          <p>Thank you for shopping with us!</p>
        </div>
      </body>
      </html>
    `;
  
    return html;
  }
  
 