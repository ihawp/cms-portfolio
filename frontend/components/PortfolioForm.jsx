import { useState } from 'react';

function PortfolioForm() {
  const [form, setForm] = useState({
    title: '',
    intro: '',
    role: '',
    timeline: '',
    toolsUsed: '',
    skillsApplied: '',
    keyTasks: '',
    challenges: '',
    takeaways: '',
    solutionSummary: '',
    githubURL: '',
    projectSite: '',
    files: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => {

        

        return { ...prev, [name]: value }
    });
  };

  const handleFileChange = (e) => {
    setForm(prev => ({ ...prev, files: e.target.files }));
  };

  const doThing = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    // Append all non-file fields
    Object.entries(form).forEach(([key, value]) => {
      if (key === 'files') return;
      formData.append(key, value);
    });

    // Append files from form.files
    for (let i = 0; i < form.files.length; i++) {
      formData.append('files', form.files[i]);
    }

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

  return (
    <>
      <form onSubmit={doThing} encType="multipart/form-data" className='flex flex-col w-280'>
        <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input type="text" name="intro" placeholder="Intro" value={form.intro} onChange={handleChange} required />
        <input type="text" name="role" placeholder="Role" value={form.role} onChange={handleChange} />
        <textarea name="timeline" placeholder="Timeline" value={form.timeline} onChange={handleChange}></textarea>
        <textarea name="toolsUsed" placeholder="Tools Used" value={form.toolsUsed} onChange={handleChange}></textarea>
        <textarea name="skillsApplied" placeholder="Skills Applied" value={form.skillsApplied} onChange={handleChange}></textarea>
        <textarea name="keyTasks" placeholder="Key Tasks" value={form.keyTasks} onChange={handleChange}></textarea>
        <textarea name="challenges" placeholder="Challenges" value={form.challenges} onChange={handleChange}></textarea>
        <textarea name="takeaways" placeholder="Takeaways" value={form.takeaways} onChange={handleChange}></textarea>
        <textarea name="solutionSummary" placeholder="Solution Summary" value={form.solutionSummary} onChange={handleChange}></textarea>
        <input type="url" name="githubURL" placeholder="GitHub URL" value={form.githubURL} onChange={handleChange} />
        <input type="url" name="projectSite" placeholder="Project Site" value={form.projectSite} onChange={handleChange} />

        <input type="file" name="files" multiple onChange={handleFileChange} />

        <input type="submit" value="Submit" />
      </form>

    </>
  );
}

export default PortfolioForm;