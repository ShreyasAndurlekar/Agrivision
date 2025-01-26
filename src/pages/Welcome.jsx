import '../App.css';

const Welcome = () => {
  return (
    <div className="w-screen h-screen relative flex flex-col bg-white overflow-x-hidden" style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}>
      <div className="flex flex-col w-full h-full">
        <Header />
        <div className="flex flex-1 justify-center py-5 w-full">
          <div className="flex flex-col flex-1 w-full max-w-[900px] px-4"> {/* Reduced max-w from 1200px to 900px */}
            <Banner />
            <div className="flex overflow-x-auto w-full gap-6 [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
               <Card
              title="Detect crop diseases"
              description="Identify and diagnose diseases in your crops using Agri AI's technology."
              imageUrl="https://cdn.usegalileo.ai/sdxl10/1335d8be-6160-4bd0-b4b4-b6a29a3f43b3.png"
              // route="/diseasedet" // Pass route to the card
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
  <header className="flex items-center justify-between w-full border-b border-solid border-[#f2f4f0] px-8 py-4">
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-4 text-[#131811]">
        <div className="size-8"> {/* Increased size from size-6 to size-8 */}
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor"></path>
          </svg>
        </div>
        <h2 className="text-[#131811] text-xl font-bold">AgroVision AI</h2>
      </div>
    </div>
    <nav className="flex gap-8">
      <a className="text-[#131811] text-base font-medium" href="#">Home</a>
      <a className="text-[#131811] text-base font-medium" href="#">Contact Us</a>
      <a className="text-[#131811] text-base font-medium" href="#">Logout</a>
    </nav>
  </header>
);


const Banner = () => (
  <div className="@container w-full">
    <div className="@[480px]:p-4 w-full">
      <div
        className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10"
        style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://cdn.usegalileo.ai/sdxl10/c62c0803-34ba-4761-ba9f-a57dc1b33123.png")' }}
      >
        <div className="flex flex-col gap-2 text-left">
        <h1 className="text-white !text-2xl font-black leading-tight tracking-wide @[480px]:!text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-wide whitespace-nowrap">
  The future of crop management is here
</h1>

          <h2 className="text-white text-xs font-normal leading-normal @[480px]:text-sm @[480px]:font-normal @[480px]:leading-normal">
            AgroVision AI offers a suite of AI-powered tools to help you monitor and manage your crops. From disease detection to weather forecasts, our platform has everything you need to optimize your farm's performance.
          </h2>
        </div>
      </div>
    </div>
  </div>
);


const Card = ({ title, description, imageUrl }) => (
  <div className="flex flex-col gap-4 bg-white rounded-lg shadow-md min-w-[200px] w-full"> {/* Reduced min-w from 220px to 200px */}
    <div className="w-full h-[180px] bg-cover bg-center rounded-t-lg" style={{ backgroundImage: `url(${imageUrl})` }}></div> {/* Reduced h-[200px] to h-[180px] */}
    <div className="p-4">
      <h3 className="text-[#141b0e] text-base font-medium mb-2">{title}</h3>
      <p className="text-[#73974e] text-sm">{description}</p>
    </div>
  </div>
);

export default Welcome;
