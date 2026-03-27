async function test() {
    console.log("Registering user...");
    const regRes = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Tester", email: "tester.kuxipilli@gmail.com", password: "password123" })
    });
    
    const regData = await regRes.json();
    console.log("Reg response status:", regRes.status);
    console.log("Reg data:", regData);

    console.log("\nRequesting password reset...");
    const resetRes = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "tester.kuxipilli@gmail.com" })
    });

    const resetData = await resetRes.json();
    console.log("Reset response status:", resetRes.status);
    console.log("Reset data:", resetData);
}

test();
