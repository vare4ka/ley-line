// mock functions to mimic making an async request

export const fetchSubmit = async (amount: number) => {
  const response = await fetch("http://localhost:3000/api/negotiation/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });

  const result: { data: number } = await response.json();

  return result;
};

export const fetchAgree = async (amount: number) => {
  const response = await fetch("http://localhost:3000/api/negotiation/agree", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });

  const result: { data: number } = await response.json();

  return result;
};

export const fetchDispute = async (amount: number) => {
  const response = await fetch("http://localhost:3000/api/negotiation/dispute", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });

  const result: { data: number } = await response.json();

  return result;
};
