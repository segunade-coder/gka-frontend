type Props = {
  text: string;
};
const EditTitle = ({ text }: Props) => {
  return (
    <>
      <p className="border-l-4 border-primary px-2 text-stone-600">{text}</p>
    </>
  );
};

export default EditTitle;
