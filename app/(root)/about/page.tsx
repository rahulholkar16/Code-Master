export default function About() {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About CodeMaster</h1>
        
        <div className="space-y-6 text-foreground/80 leading-relaxed">
          <p>
            CodeMaster is a platform designed to help developers improve their coding skills
            through practice and competition. We provide thousands of coding challenges across
            various difficulty levels and topics.
          </p>
          
          <p>
            Our mission is to make coding practice accessible, engaging, and effective for
            developers at all skill levels. Whether you&apos;re preparing for technical interviews,
            learning a new programming language, or simply looking to sharpen your problem-solving
            skills, CodeMaster has something for you.
          </p>
          
          <div className="bg-card border border-border rounded-lg p-6 mt-8">
            <h2 className="text-2xl font-bold mb-4">Our Features</h2>
            <ul className="space-y-3">
              <li>✓ Extensive problem library covering all major topics</li>
              <li>✓ Multiple programming language support</li>
              <li>✓ Real-time code execution and testing</li>
              <li>✓ Community discussions and solutions</li>
              <li>✓ Progress tracking and statistics</li>
              <li>✓ Regular coding contests</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};