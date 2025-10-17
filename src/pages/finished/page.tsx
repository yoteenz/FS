import React from "react";
import { useNavigate } from "react-router-dom";

const FinishedPage = () => {
  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate("/welcome");
  };

  return (
    <div className="finished-page bg-themeColor2 flex">
      <div className="wrap flex flex-col">
        <div className="bg-image"></div>
        <div className="bg-footer-image p-5">
          <div className="blur-box">
            <h1 className="text-2xl text-center font-covered text-black mb-2">
              YOU'RE ALMOST FINISHED...
            </h1>
            <h1 className="text-center uppercase text-[#EB1C24] text-xs">
              welcome! THANK YOU SO MUCH FOR YOUR INTEREST IN MY BRAND & ALSO
              TAKING THE TIME OUT TO SIGN UP FOR FUTURE UPDATES + CONTENT.
              YOU'RE IN FOR A TREAT & I'M SO EXCITED TO BRING MY VIRTUAL SALON
              TO YOU IN A UNIQUE BUT USER FRIENDLY WAY. GET READY TO ELEVATE
              YOUR SHOPPING EXPERIENCE AS WELL AS PURCHASING SOME OF THE BEST
              HAIR IN THE GAME, HUMBLY SPEAKING. LET THE SLAY BEGIN!
            </h1>
            <div className="flex flex-col gap-2 justify-center items-center w-full my-5">
              <h2 className="text-2xs text-center text-black">
                CLICK THE LINK BELOW TO CONFIRM YOUR NEWSLETTER SUBSCRIPTION.
              </h2>

              <button
                type="button"
                className="text-[#909090] uppercase"
                onClick={handleNextPage}
              >
                CONTINUE TO WELCOME
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishedPage;