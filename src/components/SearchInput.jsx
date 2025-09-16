import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineRight } from "react-icons/ai";

const schema = z.object({
  ip: z
    .string()
    .trim()
    .nonempty("IP را وارد کنید")
    .refine((v) => {
      const ipv4 = /^(\d{1,3}\.){3}\d{1,3}$/;
       const ipv6 =
       /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|(([0-9a-fA-F]{1,4}:){1,7}:)|(::([0-9a-fA-F]{1,4}:){0,6}[0-9a-fA-F]{1,4}))$/;
      return ipv4.test(v) || ipv6.test(v);
    }, "IP معتبر نیست"),
});


export default function SearchInput({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const handleSearch = (vals) => {
    onSubmit(vals.ip);
    reset();
  };

  return (
    <form className="search-input" onSubmit={handleSubmit(handleSearch)}>
      <input {...register("ip")} placeholder="Search for any IP address" />
      <button type="submit">
        <AiOutlineRight />
      </button>
      {errors.ip && <p className="error-text">{errors.ip.message}</p>}
    </form>
  );
}
