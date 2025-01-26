import '../App.css';

const Welcome = () => {
  return (
    <div className="relative flex min-h-screen flex-col bg-white overflow-x-hidden" style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}>
      <div className="flex h-full grow flex-col">
        <Header />
        <div className="flex flex-1 justify-center py-5 px-10">
          <div className="max-w-screen-lg flex-1 flex flex-col">
            <Banner />
            <div className="flex overflow-y-auto space-x-4">
              <Card
                title="Detect crop diseases"
                description="Identify and diagnose diseases in your crops using Agri AI's technology."
                imageUrl="https://cdn.usegalileo.ai/sdxl10/1335d8be-6160-4bd0-b4b4-b6a29a3f43b3.png"
              />
              <Card
                title="Predict crop yield"
                description="Get insights into your crop yield with our advanced prediction models."
                imageUrl="https://cdn.usegalileo.ai/sdxl10/d1cb9829-f26b-41f2-88d0-e072ccf1d9f0.png"
              />
              <Card
                title="Forecast weather"
                description="Plan ahead with our accurate weather forecasts for your fields."
                imageUrl="https://cdn.usegalileo.ai/sdxl10/a83fd6db-3b68-4fb7-b378-1501506d2455.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = () => (
  <header className="flex items-center justify-between border-b border-solid border-gray-100 px-10 py-3">
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-4 text-gray-800">
        <div className="w-10">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" />
          </svg>
        </div>
        <h2 className="text-gray-800 text-lg font-bold">AgroVision AI</h2>
      </div>
    </div>
    <div className="flex flex-1 justify-end gap-8">
      <nav className="flex items-center gap-9">
        <a className="text-gray-800 text-sm font-medium" href="#">Home</a>
        <a className="text-gray-800 text-sm font-medium" href="#">Contact Us</a>
        <a className="text-gray-800 text-sm font-medium" href="#">Logout</a>
      </nav>
    </div>
  </header>
);

const Banner = () => (
  <div className="container mx-auto px-4 py-10">
    <div className="relative flex min-h-[480px] flex-col gap-6 bg-cover bg-center rounded-xl bg-opacity-60 bg-black" 
         style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/c62c0803-34ba-4761-ba9f-a57dc1b33123.png")' }}>
      <div className="absolute inset-0 flex flex-col gap-2 p-10">
        <h1 className="text-white text-4xl font-black">The future of crop management is here</h1>
        <h2 className="text-white text-sm font-normal">
          AgroVision AI offers a suite of AI-powered tools to help you monitor and manage your crops. From disease detection to weather forecasts, our platform has everything you need to optimize your farm's performance.
        </h2>
      </div>
    </div>
  </div>
);

// Card component with typed props
const Card = ({ title, description, imageUrl }) => (
  <div className="flex flex-1 flex-col gap-4 rounded-lg bg-white shadow-md min-w-[240px]">
    <div
      className="w-full bg-cover bg-center aspect-square rounded-xl"
      style={{ backgroundImage: `url("${imageUrl}")` }}
    />
    <div className="p-4">
      <p className="text-gray-800 text-base font-medium">{title}</p>
      <p className="text-green-600 text-sm font-normal">{description}</p>
    </div>
  </div>
);

export default Welcome;
