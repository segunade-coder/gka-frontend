type Props = {
  text: string;
  className?: string;
};
const FloatingTag = ({ text, className }: Props) => {
  return (
    <div
      className={`floating w-fit z-40 top-[4.2rem] left-[38%] md:left-[50%] lg:-left-9 lg:top-40 lg:rotate-90 sticky lg:absolute text-sm bg-primary px-4 py-2 text-white rounded-br-lg lg:rounded-none rounded-bl-lg lg:rounded-tr-lg lg:rounded-tl-lg ${className}`}
    >
      {text}
    </div>
  );
};

export default FloatingTag;
