export default function Calander() {
    const iframeSrc = import.meta.env.VITE_IFRAME;
    return (
        <div className="flex justify-center mt-6 ">
            <iframe
                src={iframeSrc}
                width="800"
                height="600"
                className="border-2 border-black"
                title="Google Calendar"
            ></iframe>
        </div>
    );
}