export default function NewsItem({
  img,
  title,
  url,
}: {
  img: string;
  title: string;
  url: string;
}) {
  return (
    <>
      <div className=" relative flex items-center justify-center h-auto w-full shadow-xl rounded-xl group hover:bg-gradient-to-r from-[#311432] to-[#160340]">
        <img src={img} alt="" className="rounded-xl opacity-50" />
        <div className="block absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
          <h3 className="md:text-base text-xs font-bold text-white tracking-wider text-center">
            {title}
          </h3>
          <a href={url} target="_blank">
            <p className="text-center p-2 rounded-lg md:m-6 m-4 bg-white text-gray-700 font-bold cursor-pointer">
              Read article
            </p>
          </a>
        </div>
      </div>
    </>
  );
}
