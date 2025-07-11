type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export const Username = ({ value, setValue }: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    setValue(username);
    console.log(username);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onBlur={handleSubmit}
      className="absolute top-6 left-6 bg-yellow-50 border-4 border-yellow-800 rounded-xl p-2 shadow-[4px_4px_0_#78350f] font-handwritten text-yellow-900 w-56"
    >
      <label className="block mb-1 text-lg font-bold" htmlFor="username">
        ✏️ Username:
      </label>
      <input
        id="username"
        name="username"
        defaultValue={value}
        minLength={3}
        maxLength={20}
        required
        className="w-full px-2 py-1 border-2 border-yellow-800 rounded-md bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-700 text-base"
      />
    </form>
  );
};
