var answers = ["Wednesday comes from the Middle English Wednes dei, which is from Old English Wēdnes dæg, meaning the day of the Germanic god Woden who was a god of the Anglo-Saxons…", "Yes, you can be friends with an ex. Whether or not that's a good idea depends on your personality, your ex's personality, the nature of your relationship, and a host of other", "There will be several opnions on this question I am sure. Pitbulls can be very safe and friendly pets, if the dogs family tree properly branches. Inbreeding of the breed to re…", "Warning: This answer contains Game of Thrones spoilers.", "E=mc squared", "You should answer this question by stating very clearly the reasons you think you would be an advantage", "liques are groups of people who stick around with each other and generally are most comfortable talking with the peo...", "It can help to create the statistics. Sometimes it is difficult toknow the statistics are there if you do not see them on", "yes", "a wool fabric", "Underage is not allowed to work to any stores"];
var questions = ["Why is Wednesday spelled Wednesday", "Can you ever really be friends with an ex", "Are pit bulls good pets ?", "Which Game of Thrones actor has appeared in the most episodes", "What classical theories are still in use today?", "How should you answer the intrrview question - Why should we recruit you?", "What are the cliques in high school?", "What is the role of computer in statistics?", "Is Bournemouth University good at media?", "Where did belts come from?", "Can you work in a store at 14 years old?"];
module.exports = {
    getAnswers: (req, res, next) => {
        let ans = [];
        let limit = parseInt(req.query.top || 10);
        let sort = req.query.sort || "views";
        for (let i = 0; i < limit; i++) {
            console.log(i,"in")
            ans.push({
                answerId: (parseInt(Math.random() * 100000)).toString(),
                questionId: "456",
                answer: answers[i],
                question: questions[i],
                views: parseInt(Math.random() * 1000),
                upvotes: parseInt(Math.random() * 500),
                downvotes: parseInt(Math.random() * 100),
            })
        }
        console.log(ans.length)
        ans.sort((a, b) => {
            if (a[sort] > b[sort]) return -1;
            return 1
        });
        res.json({
            result: "success",
            response: {
                message: "Data fetched Successfully",
                code: "DATA"
            },
            answers: ans
        });
    },
    getAnswerStats: (req, res, next) => {
        let ans = [];
        let days = parseInt(req.query.days || 30);
        let type = (req.params.type || "views").toLowerCase();
        let obj = {
            answerId: "1234",
            questionId: "456",
            answer: answers[parseInt(Math.random()*10)],
            question: questions[parseInt(Math.random()*10)],
            graphData: [],
        }
        let startDate = Date.now() - (days * 24 * 60 * 60 * 1000) - 1;
        for (let i = 1; i <= days; i++) {
            let x = {
                value: parseInt(Math.random() * 100)
            }
            x.timestamp = (new Date(startDate).getMonth() + 1) + "/" + new Date(startDate).getDate();
            // if (i % 5 == 0 || i ==1) {
            // } else {
            //     x.timestamp = "";
            // }
            obj.graphData.push(x)
            startDate = startDate + (24*60*60*1000)
        }
        res.json({
            result: "success",
            response: {
                message: "Data fetched Successfully",
                code: "DATA"
            },
            data: obj
        });
    }
}