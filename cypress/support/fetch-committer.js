const fs = require('fs');


fs.writeFile("commiter.txt",  fetchENV(), err => {
    if (err) {
        console.log(err);
        return
    }
});
function fetchPayload () {
    if (process.env.BITBUCKET_PAYLOAD) {
        return process.env.BITBUCKET_PAYLOAD;
    }
    return false;


}
function formatString(string) {
    let formatted = string.substring(string.lastIndexOf("<")+1, string.lastIndexOf(">"));
    return formatted;
}

function fetchENV () {
    let committer;
    const bitPayload = fetchPayload();
    
    if (bitPayload) {
        const payload = JSON.parse(bitPayload);
        const commit_author = payload.push.changes[0].commits[0].author.raw;

        committer = JSON.stringify(commit_author);

        committer = formatString(committer);
   
    } else {
        // Payload committer looks the same;
        committer = "Reemet Paabo <reemet@coolbet.com>"
        committer = formatString(committer);
        
    }
    
    return  committer;
};