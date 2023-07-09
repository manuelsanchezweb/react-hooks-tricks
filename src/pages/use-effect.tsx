import { useEffect, useState } from "react";

const PageUseEffect = () => {

    interface User {
        name: string;
        // Add any other properties from the API response
    }

    const [data, setData] = useState<User[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users");
                const result = await response.json();
                setData(result);
                console.log(result)
            } catch (error) {
                console.log(error);
            }
        
        };

        fetchData();
    }, []);

   

    return (
        <div>
            <ul>
                {data && data.map((user: any, index: number) => (
                    <li key={index}>{user.name}</li>
                ))}
            </ul>
        </div>

    );
};

export default PageUseEffect;