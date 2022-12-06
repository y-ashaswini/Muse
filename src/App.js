import { useState } from "react";
import searchimg from "./Images/searchimg.svg";
import downloadimg from "./Images/downloadimg.svg";
export default function App() {
  const [all_details, setAllDetails] = useState([]);
  const [search, setSearch] = useState("");
  const [maxResults, setMaxResults] = useState("5");

  const API_KEY = "AIzaSyCNwlyKFyVNrX8evy9Y4CnazgoD8Zo_Efc";
  const topics = "/m/04rlf";
  let url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&regionCode=US&maxResults=${maxResults}&topicId=${topics}&q=${search}`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "aba3a24fa7msh5a17263220c79a7p13b0fbjsn40725cb8ea7b",
      "X-RapidAPI-Host": "youtube-mp3-download1.p.rapidapi.com",
    },
  };

  function handleSearch(query) {
    console.log("search button was clicked, query: ", query);
    if (query) {
      setSearch(query);
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw Error("error: ", res.status);
          } else {
            return res.json();
          }
        })
        .then((data) => {
          data.items.map((each) => {
            const theid = each.id.videoId;
            fetch(
              `https://youtube-mp3-download1.p.rapidapi.com/dl?id=${theid}`,
              options
            )
              .then((response) => response.json())
              .then((response) => {
                console.log("title: " + response.title);
                setAllDetails((prev) => [
                  ...prev,
                  {
                    title: response.title,
                    link: response.link,
                  },
                ]);
              })
              .catch((err) => console.error("error in each id: ", err));
          });
        })
        .catch((err) => {
          console.log("catching error while fetching ids: ", err);
        });
    } else {
      console.log("search is empty");
    }
  }

  return (
    <div className="text-two bg-black w-screen h-screen text-white flex flex-col justify-center align-middle text-center">
      <div className="lg:w-[40vw] sm:w-[70vw] w-[90vw] mx-auto">
        <div className="text-one my-5 md:text-[8rem] sm:text-[5rem] text-[4rem] md:tracking-widest">
          MUSE.
        </div>

        <form className="mx-10 sm:grid sm:grid-cols-10 flex flex-col justify-between gap-6 sm:text-[1rem] text-[0.8rem]">
          <input
            type="text"
            value={search}
            placeholder="Your Search"
            onChange={(e) => setSearch(e.target.value)}
            className="hover:opacity-100 opacity-50 duration-300 col-span-6 w-full outline-none border-b-2 hover:border-white border-black bg-black py-1 italic"
          />
          <input
            type="text"
            value={maxResults}
            placeholder="No. of Results"
            onChange={(e) => setMaxResults(e.target.value)}
            className="hover:opacity-100 opacity-50 duration-300 col-span-3 w-full outline-none border-b-2 hover:border-white border-black bg-black py-1 italic"
          />
          <img
            onClick={() => handleSearch(search)}
            src={searchimg}
            className="hidden sm:block my-auto mx-auto cursor-pointer max-w-[1.5rem] duration-300 -ml-2"
          />
          <div
            onClick={() => handleSearch(search)}
            className="sm:hidden bg-white text-black py-2 italic font-bold"
          >
            SEARCH
          </div>
        </form>
        <div className="px-10 my-5 h-[30vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-white scrollbar-track-black scrollbar-thumb-rounded-full">
          {!all_details && search && <div className="text-sm italic sm:text-[1rem]">Loading</div>}
          {all_details &&
            all_details.map(
              (each) =>
                each.title && (
                  <a
                    className="text-sm italic sm:text-[1rem] cursor-pointer hover:opacity-100 opacity-50 duration-300 no-underline border-2 rounded-md border-white px-5 py-1 text-left my-2 flex flex-row justify-between"
                    href={each.link}
                    target="_blank"
                  >
                    <div className="text-md my-auto">{each.title}</div>
                  </a>
                )
            )}
        </div>
      </div>
      <a href="https://github.com/y-ashaswini/" className = "text-one no-underline text-white hover:opacity-100 opacity-50 duration-300 absolute left-[50%] translate-x-[-50%] bottom-1 text-md">Made with ❤️ by Yashaswini</a>
    </div>
  );
}
