import { Typography } from "@material-tailwind/react";

export default function Footer() {
    return (
        <footer className="w-full bg-white p-8">
            <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
                <img src='/logo.png' alt="logo-ct" className="w-16 h-auto" />
                <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                    <li>
                        <Typography
                            as="a"
                            href="https://github.com/Mohamed-Magdy-fayed"
                            target='_blank'
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            Github Account
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            href="https://megz-portfolio.onrender.com"
                            target='_blank'
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            Portfolio
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            href="https://www.linkedin.com/in/mohamed-magdy-fayed"
                            target='_blank'
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            LinkedIn
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            href="https://wa.me/201123862218"
                            target='_blank'
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            Contact Us
                        </Typography>
                    </li>
                </ul>
            </div>
            <hr className="my-8 border-blue-gray-50" />
            <Typography color="blue-gray" className="text-center font-normal">
                &copy; 2023 Mohamed Magdy
            </Typography>
        </footer>
    );
}