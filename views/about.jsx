export function About() {
    const teamMembers = [
        {
            name: "Omer Hassin",
            image: "./assets/img/suzuki.jpg",
            description: "short description about Omer.",
            facebook: "https://facebook-url.com",
            linkedin: "https://linkedin-url.com",
            github: "https://github-url.com"
        },
        {
            name: "Kfir Shaked",
            image: "./assets/img/fiat.jpg",
            description: "short description about Kfir.",
            facebook: "https://facebook-url.com",
            linkedin: "https://linkedin-url.com",
            github: "https://github-url.com"
        }
    ];

    return (
        <section className="about">
            <h1>About Page</h1>
            {teamMembers.map((member, index) => (
                <div key={index} className="team-member">
                    <img src={member.image} alt={member.name} className="profile-picture" />
                    <h2>{member.name}</h2>
                    <p>{member.description}</p>
                    <div className="social-media-links">
                        <a href={member.facebook} target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook fa-2xl"></i></a>
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin fa-2xl"></i></a>
                        <a href={member.github} target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github fa-2xl"></i></a>
                    </div>
                </div>
            ))}
        </section>
    );
}