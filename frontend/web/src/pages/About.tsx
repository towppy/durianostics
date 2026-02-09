import React from 'react';
import '../../styles/About.css';

// Team member type
interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
}

const About: React.FC = () => {
  // Dynamic content
  const hero = {
    title: 'About Durianostics',
    description: 'Durianostics is dedicated to delivering the best AI-powered solutions for durian quality analysis and fruit tracking.',
    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
    color: '#fff'
  };

  const mission = {
    title: 'Our Mission',
    description: 'Our mission is to empower farmers and distributors with accurate, real-time insights to ensure the best quality durians reach the market.'
  };

  const team: TeamMember[] = [
    { name: 'Aia A. Garcia', role: 'Group Leader', imageUrl: '/assets/images/aia.jpg' },
    { name: 'Carl Evan T. Piad', role: 'Member 1', imageUrl: '/assets/images/evan.jpg' },
    { name: 'Kathleen Mae R. Priol', role: 'Member 2', imageUrl: '/assets/images/kat.jpg' },
    { name: 'Kevin R. Ofracio', role: 'Member 3', imageUrl: '/assets/images/kevin.png' },
    { name: 'Prof. Pops V. Madriaga', role: 'Professor', imageUrl: '/assets/images/mam.png' },
  ];

  return (
    <div className="about-page">
      <main className="about-main">
        {/* Hero Section */}
        <section className="hero-section" style={{ background: hero.background, color: hero.color }}>
          <h1>{hero.title}</h1>
          <p>{hero.description}</p>
        </section>

        {/* Mission Section */}
        <section className="mission-section">
          <h2>{mission.title}</h2>
          <p>{mission.description}</p>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <h2>Meet the Team</h2>
          <div className="team-members">
            {team.map((member, index) => (
              <div className="team-member" key={index}>
                <img src={member.imageUrl} alt={member.name} />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
