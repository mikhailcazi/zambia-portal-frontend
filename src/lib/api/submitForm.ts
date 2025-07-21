// src/lib/api/submitForm.ts
export async function submitForm(data: FormData) {
  const response = await fetch("/api/submit", {
    method: "POST",
    body: data,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Something went wrong");
  }

  return response.json();
}
