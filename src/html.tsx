export const HTMLPages = () => {
    return (
        <>
            <head>
                <meta charset="UTF-8" />
                <script src="https://unpkg.com/htmx.org@1.9.12" integrity="sha384-ujb1lZYygJmzgSwoxRggbCHcjc0rB2XoQrxeTUQyRjrOnlCoYta87iKBWq3EsdM2" crossorigin="anonymous"></script>
                <title>Kecilink</title>
                <script src="https://cdn.tailwindcss.com"></script>
            </head>
            <body>
                <header className="flex flex-row justify-between p-4 border-b-2 m-auto">
                    <span>Kecilink</span>
                    <nav>
                        <ul className=" flex flex-row space-x-4">
                            <a href="">About me</a>
                            <a href="">Donate</a>
                            <a href="">Home</a>
                        </ul>
                    </nav>
                </header>
                <main className="m-auto mx-10 flex">
                    <section className="my-24 m-auto ">
                        <div className="flex flex-col">
                            <div className="flex flex-col gap-2">
                                <span className="text-2xl font-bold text-cyan-500">Kecilin tautan kamu,</span>
                                <span className="text-2xl font-extrabold">Agar mudah diingat :)</span>
                            </div>
                            <span className="text-xl mt-4 text-gray-400">Gunakan sesukamu, tapi ingat jika ada yang sudah ada gunakan yang lain ya</span>
                        </div>
                    </section>
                </main>
                <footer></footer>
            </body>
        </>
    )
}