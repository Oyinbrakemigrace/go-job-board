import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function applyToJob(token, _, jobData) {
  const supabase = supabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `resume-${random}-${jobData.candidate_id}`;

  const { error: storageError } = await (await supabase).storage
    .from("resume")
    .upload(fileName, jobData.resume);

  if (storageError) {
    console.error("Error Uploading Resume", storageError);
    return null;
  }

  const resume = `${supabaseUrl}/storage/v1/object/public/resume/${fileName}`;

  const { data, error } = await (
    await supabase
  )
    .from("applications")
    .insert([
      {
        ...jobData,
        resume,
      },
    ])
    .select();

  if (error) {
    console.error("Error Submitting Applications", error);
    return null;
  }
  return data;
}

export async function updateApplicationsStatus(token, { job_id }, status) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("applications")
    .update({ status })
    .eq("job_id", job_id)
    .select();

    if(error || data.length === 0){
      console.error("Error updating applications", error)
      return null
    }
    return data
}

