
export default async (req, res) => {
        const { body, email, feedbackLevel, lesson } = req.body;

        const query = `
        mutation createFeedback(
            $body: String, 
            $email: String, 
            $feedbackLevel: FeedbackLevel, 
            $lesson: ID) {
                createFeedback(data:{
                body: $body,
                email: $email,
                feedbackLevel: $feedbackLevel,
                lesson: {connect: {id: $lesson}}
            }) {
                    id
                    body
                    email
                    feedbackLevel
                }
        }`

        const response = await fetch('https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clddka9yq1aw301ui7zzh4kf3/master', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${process.env.HYGRAPH_API_KEY}`
                },
                body: JSON.stringify({query, variables:  { body, email, feedbackLevel, lesson }})
        })
        const json = await response.json()
        
        return res.status(200).json(json)
}