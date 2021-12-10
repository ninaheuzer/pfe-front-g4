import Link from "next/link";
const ButtonMailTo = ({ mailto, title }) => {
  //add post to param
  const post = {
    title: "blabla",
  };
  const ref = `mailto:${mailto}?subject=Achat ${post.title}`;
  return (
    <div>
      <a
        href={ref}
        class="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
      >
        Envoyez un mail
      </a>
    </div>
  );
};

export default ButtonMailTo;