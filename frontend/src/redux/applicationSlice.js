import { createSlice } from "@reduxjs/toolkit"; 
const applicationSlice = createSlice({
    name: 'application',
    initialState: {
        applicantsForJob:{},
        allApplications:[],
    },
    reducers:{
        setAllApplicants: (state, action) => {
            const {jobId, data} = action.payload;
            state.applicantsForJob[jobId] = data
        },
        setAllApplications: (state, action) => {
            state.allApplications = action.payload
        }
    }
})

export const {setAllApplicants, setAllApplications} = applicationSlice.actions
export default applicationSlice.reducer