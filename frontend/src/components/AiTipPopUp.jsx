import { useQuery } from "@tanstack/react-query";
import { AlertCircleIcon, Loader, X } from "lucide-react";
import { aiTipApi } from "../services/api";
import ReactMarkDown from "react-markdown";
import remarkGfm from "remark-gfm";

function AiTipPopUp({ setIsShowingAiPopup, cfh, setCfh }) {
  const {
    data: aiTip,
    isLoading: isLoadingAiTip,
    error: aiTipError,
  } = useQuery({
    queryKey: ["genAiTip"],
    queryFn: () =>
      aiTipApi(
        cfh.totalEmission,
        JSON.stringify(cfh.categoryEmission),
        JSON.stringify(cfh.categoryBreakdown),
        JSON.stringify(cfh.categoryTips),
        cfh._id
      ),
  });
  console.log(aiTip);

  return (
    <section className="w-dvw h-dvh fixed top-0 left-0 z-10 bg-[#0000006e] backdrop-blur-sm flex justify-center items-center">
      <div className="w-[90dvw] h-[90dvh] relative bg-bg-alt  p-6 rounded-md ">
        <button
          className="absolute top-6 right-10 cursor-pointer"
          onClick={() => {
            setIsShowingAiPopup(false);
            setCfh(null);
          }}
        >
          <X className="text-primary" size={20} />
        </button>

        <main className=" h-full w-full flex justify-center items-center flex-col">
          <span className="w-full pb-4">
            <h2 className="text-3xl font-bulter">Ai Generated Summary</h2>
          </span>
          {isLoadingAiTip && (
            <div className="w-full h-full flex justify-center items-center">
              <Loader className="animate-spin" />
            </div>
          )}

          {aiTip?.error && !isLoadingAiTip && (
            <div className="w-full h-full flex justify-center items-center flex-col">
              <AlertCircleIcon />
              <p className="text-lg">{aiTip?.error?.message}</p>
            </div>
          )}
          {aiTip && !isLoadingAiTip && (
            <div className="scroller w-full h-full overflow-y-auto p-4">
              <div className="disable-tailwind">
                <ReactMarkDown
                  remarkPlugins={[remarkGfm]}
                  children={aiTip?.data?.data?.tipText}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </section>
  );
}

export default AiTipPopUp;
