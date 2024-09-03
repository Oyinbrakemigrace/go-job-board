import supabaseClient from "@/utils/supabase";

export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseClient(token);

  let query = supabase
    .from("jobs")
    .select("*, company: companies(name,logo_url), saved: saved_jobs(id)"); //along with all the job details, i also want something from the companies table - the name and the logo_url and the saved_jobs id

  if (location) {
    query = query.eq("location", location);
  }
  if (company_id) {
    query = query.eq("company_id", company_id);
  }
  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching Jobs", error);
    return null;
  }
  return data;
}

export async function saveJobs(token, { alreadySaved }, savedData) {
  const supabase = await supabaseClient(token);

  if (alreadySaved) {
    const { data, error: deleteError } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", savedData.job_id);

    if (deleteError) {
      console.error("Error fetching Jobs", deleteError);
      return null;
    }
    return data;
  } else {
    const { data, error: insertError } = await supabase
      .from("saved_jobs")
      .insert([savedData])
      .select();
    if (insertError) {
      console.error("Error fetching Jobs", insertError);
      return null;
    }
    return data;
  }
}

export async function getSingleJob(token, { job_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .select(
      "*, company:companies(name, logo_url), applications: applications(*)"
    )
    .eq("id", job_id)
    .single();

  if (error) {
    console.error("Error fetching job", error);
    return null;
  }

  return data;
}

export async function updateHiringStatus(token, { job_id }, isOpen) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .update({ isOpen })
    .eq("id", job_id)
    .select();

  if (error) {
    console.error("Error updating Job", error);
    return null;
  }
  return data;
}

//create a job
export async function addNewJob(token, _, jobData) {
  const supabase = supabaseClient(token);

  const { data, error } = await (await supabase)
    .from("jobs")
    .insert([jobData])
    .select();

  if (error) {
    console.error("Error creating job", error);
    return null;
  }
  return data;
}

// fetch saved jobs
export async function getSavedJobs(token) {
  const supabase = supabaseClient(token);

  const { data, error } = await (await supabase)
    .from("saved_jobs")
    .select("*, job:jobs(*, company:companies(name,logo_url))");

  if (error) {
    console.error("Error fetching saved jobs", error);
    return null;
  }
  return data;
}

export async function getCreatedJobs(token, { recruiter_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .select("*, company:companies(name,logo_url)")
    .eq("recruiter_id", recruiter_id);

  if (error) {
    console.error("Error fetching job", error);
    return null;
  }
  return data;
}

export async function deleteJob(token, { job_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", job_id)
    .select();

  if (error) {
    console.error("Error deleting job", error);
    return null;
  }
  return data;
}
