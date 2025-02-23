import { Camera, Github } from 'lucide-react';


export const Footer = () => {
    return (
        <footer className="footer bg-base-200 rounded-lg p-10">
            <aside>
                <Camera size={50} />
                <p className='text-2xl'>Obscura</p>
                <p>
                    Developed by <a href="https://github.com/soucosmo" target='_blank'><span className='font-bold'>Cosmo André</span></a>
                </p>
            </aside>
            <nav>
                <h6 className="footer-title">Social</h6>
                <div className="grid grid-flow-col gap-4 cursor-pointer">
                    <a className='flex gap-2' href='https://github.com/soucosmo/obscura' target='_blank'>
                        <Github size={20}/> Github
                    </a>
                </div>
            </nav>
        </footer>
    )
}