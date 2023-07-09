import { useState, useMemo } from "react";

const PageUseMemo = () => {
    const [query, setQuery] = useState('');

    const items = [
        "Harry Potter and the Philosopher's Stone",
        "The Lord of the Rings",
        "To Kill a Mockingbird",
        "Pride and Prejudice",
        "The Great Gatsby",
        "Moby Dick",
        "1984",
        "The Catcher in the Rye",
        "War and Peace",
        "Ulysses",
        "The Odyssey",
        // ... more items ...
    ];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const filteredItems = useMemo(() => {
        return items.filter(item =>
            item.toLowerCase().includes(query.toLowerCase())
        );
    }, [items, query]);

    return (
        <section className="flex flex-col gap-4 mb-12">
            <h1 className="text-3xl md:text-5xl mb-12 font-bold">useMemo</h1>
            <p>
            Con useMemo lo que podemos hacer es ...
            </p>

            <input type="text" value={query} onChange={handleChange} placeholder="Search..." />
            <ul>
                {filteredItems.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </section>
    );
};

export default PageUseMemo;