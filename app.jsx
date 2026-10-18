const [title, setTitle] = useState("");
const [load, setLoad] = useState("");
const [reps, setReps] = useState("");

const [error, setError] = useState("");
const [success, setSuccess] = useState("");

const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
        const response = await fetch("http://localhost:4000/api/workouts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                load: Number(load),
                reps: Number(reps)
            })
        });

        const data = await response.json();

        // Show backend validation error
        if (!response.ok) {
            setError(data.error);
            return;
        }

        // Show success message
        setSuccess("Workout added successfully!");

        setTitle("");
        setLoad("");
        setReps("");
    } catch (error) {
        setError("Unable to connect to the server");
    }
};
{error && (
    <p style={{ color: "red" }}>
        {error}
    </p>
)}

{success && (
    <p style={{ color: "green" }}>
        {success}
    </p>
)}