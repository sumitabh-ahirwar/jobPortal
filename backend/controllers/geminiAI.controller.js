import client from "../utils/geminiai.js";

export const generateJobDescription = async (req, res) => {
  try {
    const { title, location, jobType, requirements, positions, experience} = req.body;

    if (!title || !requirements) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const prompt = `
Generate a professional job description for the following role:
on the first line give a job desciption summary of 1 line
Job Title: ${title}
Skills Required: ${requirements}
Experience Level: ${experience}
Job Type: ${jobType}


Include:
- Job summary
- Key responsibilities
- Required skills
- Nice-to-have skills
- Benefits
`;

    const response = await client.chat.completions.create({
      model: "gemini-3-flash-preview",
      messages: [
        {
          role:'user',
          content: prompt
        }]
    });
    const description = response.choices[0].message;
    return res.status(200).json({
      success: true,
      description,
    });

  } catch (error) {
    console.error("AI Job Description Error:", error);
    res.status(500).json({ success: false });
  }
};
