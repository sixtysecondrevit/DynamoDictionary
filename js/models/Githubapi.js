

function commitChanges(ob){
//    var ob=JSON.parse(ob);
//    console.log(ob)
   require(["githubapi"], function (Github) {
    // This is a personal access token, not using oAuth.
    // Currently this is under ramramps.  We have  to create
    // a generic user id and add to Github collobrator.
    // Add the token to a config file and put it in S3. Do not share the token
    var github = new Github({
        token: ""
    });

    //step 1: Create the branch
    //TO DO : Generate unique name for the branch
    var repo = github.getRepo("DynamoDS", "DynamoDictionary");
//        repo.createBranch("master", "UserEdits", function (err) {
    //        if (err)
    //            console.log(err);

    //step 2 : Read / get the contents
    //To do : Read from the file system
    //TO DO:  Read images or other file formats
    repo.getContents("UserEdits", "data/Dynamo_Nodes_Documentation.json", true, function (err, contents) {

        var options = {
            author: {
                name: 'Ram',
                email: 'ram@example.com'
            },
            committer: {
                name: 'Ram',
                email: 'Ram@example.com'
            },
            encode: true // Whether to base64 encode the file. (default: true) 
        };

        //            step 3 : write the contents
        repo.writeFile('UserEdits', 'data/Dynamo_Nodes_Documentation.json', ob, 'UserEdits', options, function (err) {
            if (err)
                console.log(err);

            var pull = {
                title: "UserEdits",
                body: "This pull request has been automatically generated by DynamoDictionaryUser.",
                base: "master",
                head: "UserEdits"
            };

            //step 4 : create the PR
            repo.createPullRequest(pull, function (err, pullRequest) {
                if(err)
                    console.log(err);
                var pr = pullRequest;
            });
        });

                });
//    });

}); 
    
    
}
