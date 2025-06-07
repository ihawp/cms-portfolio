import { useState } from 'react';

function PortfolioForm() {
  const [form, setForm] = useState({
    title: '',
    intro: '',
    role: '',
    timeline: [],
    toolsUsed: [],
    skillsApplied: [],
    keyTasks: [],
    challenges: [],
    takeaways: [],
    solutionSummary: '',
    githubURL: '',
    projectSite: '',
    files: []
  });

  const handleChange = (e) => {
    const { name, value, id } = e.target;
    setForm(prev => {

        console.log(prev);

        if (typeof prev[name] === 'object') {
            return { 
                ...prev, 
                [name]: { 
                    ...prev[name], 
                    [id]: value 
                } 
            }
        } else {
            return { ...prev, [name]: value }
        }

    });
  };

  const handleFileChange = (e) => {
    setForm(prev => ({ ...prev, files: e.target.files }));
  };

  const submitPortfolioEntry = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    /*
    // Append all non-file fields
    Object.entries(form).forEach(([key, value]) => {
      if (key === 'files') return;
      formData.append(key, value);
    });

    // Append files from form.files
    for (let i = 0; i < form.files.length; i++) {
      formData.append('files', form.files[i]);
    }
    */
    try {
      const response = await fetch('http://localhost:3000/api/v1/portfolio/', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // the form needs to be dynamically generatable
  // I need to be able to click add new key task so that I may have another array entry..?
  // I believe that is the most straightforward option, it would be less ideal to spend time splitting by commas (,) 
  // and having extra formatting, multiple text box values added to array seems reasonable

  return (
    <>
      <form onSubmit={submitPortfolioEntry} encType="multipart/form-data" className='flex flex-col w-280'>
        <input type="text" name="title" id="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input type="text" name="intro" id="intro" placeholder="Intro" value={form.intro} onChange={handleChange} required />
        <input type="text" name="role" id="role" placeholder="Role" value={form.role} onChange={handleChange} />
        <textarea name="timeline" id="timeline" placeholder="Timeline" value={form.timeline} onChange={handleChange}></textarea>
        <textarea name="toolsUsed" id="toolsUsed" placeholder="Tools Used" value={form.toolsUsed} onChange={handleChange}></textarea>
        <textarea name="skillsApplied" id="skillsApplied" placeholder="Skills Applied" value={form.skillsApplied['skillsApplied']} onChange={handleChange} maxLength={255}></textarea>
        <textarea name="skillsApplied" id="skillsApplied2" placeholder="Skills Applied" value={form.skillsApplied['skillsApplied2']} onChange={handleChange} maxLength={255}></textarea>
        <textarea name="keyTasks" id="keyTasks" placeholder="Key Tasks" value={form.keyTasks} onChange={handleChange}></textarea>
        <textarea name="challenges" id="challenges" placeholder="Challenges" value={form.challenges} onChange={handleChange}></textarea>
        <textarea name="takeaways" id="takeaways" placeholder="Takeaways" value={form.takeaways} onChange={handleChange}></textarea>
        <textarea name="solutionSummary" id="solutionSummary" placeholder="Solution Summary" value={form.solutionSummary} onChange={handleChange}></textarea>
        <input type="url" name="githubURL" id="githubURL" placeholder="GitHub URL" value={form.githubURL} onChange={handleChange} />
        <input type="url" name="projectSite" id="projectSite" placeholder="Project Site" value={form.projectSite} onChange={handleChange} />

        <input type="file" name="files" id="files" multiple onChange={handleFileChange} />

        <input type="submit" value="Submit" />
      </form>

    </>
  );
}

export default PortfolioForm;