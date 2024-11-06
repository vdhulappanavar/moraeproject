const names = [
    "Marian Lan", "Marisol Kane", "Seymour Clark", "Madelyn Huerta", "Erick Pratt", 
    "Cecelia Roach", "Cyril Miranda", "Trisha Tate", "Thaddeus Dyer", "Bonita Lindsey", 
    "Alta Daniel", "Merrill Trevino", "Lynn Harvey", "Fritz Henry", "Thad Arroyo", 
    "Zachary Solis", "Rolland Lynn", "Arlen Silva", "Stan Rich", "Joseph Stout", 
    "Quentin Barnes", "Beau Lutz", "Winnie Dickson", "Juliet Haney", "Stuart Haley", 
    "Heidi Ponce", "Francesco Buckley", "Georgina Atkinson", "Hershel Simpson", 
    "Bryant Yang", "Jamaal Harrell", "Randi Bird", "Amanda Mendoza", "Dolly Pollard", 
    "Rayford Hughes", "Dominick Buck", "Elva Mosley", "Emanuel Fleming", "Domingo Le", 
    "Randell Jensen", "Christie Cantu", "Chris Hodges", "Alba Avila", "Bryce Harding", 
    "Emilia Dennis", "Leigh Vang", "Cody Allison", "Wiley Villegas", "Alden Guerrero"
];

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const itemsPerPage = searchParams.get('itemsPerPage') || '10';

    const currentPage = parseInt(page, 10);
    const itemsPerPageCount = parseInt(itemsPerPage, 10);

    const peopleData = names.map((name, index) => ({
        id: index + 1,
        name,
        age: Math.floor(Math.random() * (60 - 20 + 1)) + 20, // Random age between 20 and 60
        city: `City ${index % 5 + 1}`, // Cycles through 5 city names
        email: `${name.split(" ").join(".").toLowerCase()}@example.com`
    }));

    const startIndex = (currentPage - 1) * itemsPerPageCount;
    const endIndex = startIndex + itemsPerPageCount;
    const paginatedData = peopleData.slice(startIndex, endIndex);

    return new Response(
        JSON.stringify({
            data: paginatedData,
            total: peopleData.length,
            currentPage,
            totalPages: Math.ceil(peopleData.length / itemsPerPageCount),
        }), 
        { status: 200, headers: { 'Content-Type': 'application/json' }}
    );
}
