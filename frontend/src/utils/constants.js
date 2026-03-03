const BASE_URL = import.meta.env.VITE_API_URL;

export const USER_API_ENDPOINT = `${BASE_URL}/api/v1/users`;
export const JOB_API_ENDPOINT = `${BASE_URL}/api/v1/job`;
export const APPLICATION_API_ENDPOINT = `${BASE_URL}/api/v1/application`;
export const COMPANY_API_ENDPOINT = `${BASE_URL}/api/v1/company`;
export const AI_API_ENDPOINT = `${BASE_URL}/api/v1/ai`;

export const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
  "Data Scientist",
  "Machine Learning Engineer",
  "DevOps Engineer",
  "Mobile App Developer",
  "UI/UX Designer",
  "Cybersecurity Engineer",
  "Cloud Computing",
  "Project Management",
  "Database Administrator",
  "Network Engineer",
  "Technical Support"
];