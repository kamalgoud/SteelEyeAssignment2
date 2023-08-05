function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {

  const getHTMLPosition = (plainTextPos) => {
    const prefix = plainText.slice(0, plainTextPos);
    return prefix.length 
  };

  // Sort positions in ascending order of start positions
  const sortedPositions = plainTextPositions.sort((a, b) => a.start - b.start);

  // Insert <mark> tags in plainText
  let offset = 0; // Offset to adjust positions 
  sortedPositions.forEach(({ start, end }) => {
    const htmlStart = getHTMLPosition(start + offset);
    const htmlEnd = getHTMLPosition(end + offset);
    const tagStart = `<mark>`;
    const tagEnd = `</mark>`;
    plainText =plainText.slice(0, htmlStart) +tagStart +plainText.slice(htmlStart, htmlEnd) +tagEnd + plainText.slice(htmlEnd);
    offset += tagStart.length + tagEnd.length;
  });

  

  var j = 0;
  var i = 0;
  var flag = 0;// Helps to put open mark tag or closing mark tag
  var prev ='';
  while(i<htmlContent.length && j<plainText.length){
    if(htmlContent.charAt(i)==='<'){
        while(htmlContent.charAt(i)!='>'){
            prev = prev+htmlContent.charAt(i);
            i++;
        }
        i++;
    }
    if(plainText.charAt(j)!=' ' && htmlContent.charAt(i)===' '){
        i++;
        continue;
    }
    var f = false
    while(htmlContent.charAt(i)===plainText.charAt(j) && htmlContent.charAt(i)!='<' && plainText.charAt(j)!='<'){
        i++;
        j++;
        f=true;
    }
    if(f && plainText.charAt(j)==='<' && plainText.charAt(j+1)==='/' && htmlContent.charAt(i)!='<'){
        continue;
    }
    if(plainText.charAt(j)==='<'){
        if(flag%2===0){
            htmlContent = htmlContent.slice(0,i)+`<mark>`+htmlContent.slice(i,htmlContent.length);
            j+=6;
        }
        else{
            htmlContent = htmlContent.slice(0,i)+`</mark>`+htmlContent.slice(i,htmlContent.length);
            j+=7;
        }
        flag++;
    }

    if(plainText.charAt(j)===' ' && htmlContent.charAt(i)!=' '){
        j++;
    }
    else if(plainText.charAt(j)!=' ' && htmlContent.charAt(i)===' '){
        i++;
    }
    // console.log(htmlContent.charAt(i),plainText.charAt(j));
    // console.log(htmlContent,"---",plainText);
  }
  return htmlContent;
}

// Example usage:
// const htmlContent = `<p><span>Hi David<br><br>Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects<br><br>Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar…<br><br>Read the full article <a href="https://content.seleritycorp.com/hosted/assets/www/UKMW47_hYz_RGzPSpHm44Hi1L49HdNBhs1OkKKW2OPI">here</a><br><br>-------------------------------------<br><br>You received this because you are subscribed to news related to <a href="https://iris.steeleye.co/market/instruments?search=ES0113900J37">ES0113900J37</a>, and this story was marked as 82% relevant.<br><br>Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. <br><br>To unsubscribe change your email preferences, please click <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">here</a>.<br><br>-------------------------------------<br><br><img src="https://context.seleritycorp.com/selerity/assets/sc_icons/pressRelease.png" alt="Rick Astley" style="width:100px;height:100px;"></span></p>`;
// const plainText = `Hi David Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar… Read the full article here ------------------------------------- You received this because you are subscribed to news related to ES0113900J37 , and this story was marked as 82% relevant. Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. To unsubscribe change your email preferences, please click here . -------------------------------------`;
// const plainTextPositions = [
//   {
//     start: 241,
//     end: 247,
//   },
//   {
//     start: 518,
//     end: 525,
//   },
// ];

//testCase2  :  nested tags
// const htmlContent = '<p><span>Hello</span> <span>World</span></p>';
// const plainText = 'Hello World';
// const plainTextPositions = [{ start: 6, end: 11 }];



//testCase3  : multiple positions
const htmlContent = '<p>Hello World</p>';
  const plainText = 'Hello World';
  const plainTextPositions = [
    { start: 0, end: 5 },
    { start: 6, end: 11 },
  ];


const highlightedContent = highlightHTMLContent(
  htmlContent,
  plainText,
  plainTextPositions
);
console.log(highlightedContent);
