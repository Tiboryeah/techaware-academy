async function test() {
    console.log("Logging in...");
    const loginRes = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "tester.kuxipilli@gmail.com", password: "password123" })
    });
    
    const loginData = await loginRes.json();
    console.log("Login data:", loginData);
    if (!loginData.token) {
        console.log("No token, exiting.");
        return;
    }

    console.log("\nSubmitting report...");
    const reportRes = await fetch("http://localhost:5000/api/reports/submit", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${loginData.token}`
        },
        body: JSON.stringify({ title: "Test Report", category: "Otro", description: "This is a test description." })
    });

    const reportData = await reportRes.json();
    console.log("Report status:", reportRes.status);
    console.log("Report data:", reportData);
}

test();
