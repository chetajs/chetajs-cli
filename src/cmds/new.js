import {createProject} from "../main"

const newProject = async (options) => {
    // console.log(options)
    await createProject(options)
}

export default newProject;