import Button from "../components/Button";

export default function Signup() {
  return (
    <div className='container py-10 px-4 mx-auto flex flex-wrap justify-center items-center'>
        <p className="w-full text-left font-bold text-4xl">Create <br/> Account</p>
        <form className="mt-5 flex w-full flex-wrap">
            <label htmlFor="email" className="font-semibold">Email</label>
            <input placeholder="Email" type={"text"} className="mt-2 px-4 border-[#1F8734] border w-full py-4 rounded-xl"></input>
        
            <label htmlFor="password" className="mt-5 font-semibold">Password</label>
            <input placeholder="Password" className="mt-2 px-4 py-4 rounded-xl border border-[#1F8734] w-full" type="password"></input>
        
            <div className="flex items-center justify-center gap-5 mt-5">
                <input type="checkbox" className="ml-1 w-5 h-5  accent-[#1F8734] rounded-3xl"></input>
                <p className="text-[12.13px] text-[#8D8D8D]">
                I agree to the <a href="#" className="text-[#1F8734]">Terms & Conditions</a><br/> and <a href="#" className="text-[#1F8734]">Privacy Policy</a>
                </p>
            </div>
        </form>

        <div className="mt-5 flex w-full flex-wrap justify-center items-center gap-5">
            <Button className={"bg-[#1F8734] text-white font-bold"}>Create account</Button>
            <Button className={"border border-[#1F8734] text-[#1F8734] font-bold"}>Sign up with Google</Button>
        </div>

        <p className="mt-5 font-semibold w-full  text-[#8D8D8D] text-[12.13px]">Already have an account? <a href="signin" className="text-[#1F8734] hover:underline">Log in</a></p>
    </div>
  )
}