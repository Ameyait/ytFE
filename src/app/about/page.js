export default function about() {
    function removeDuplicate(arrays) {
        for (let i = 0; i < arrays.length; i++) {
            for (let j = i + 1; j < arrays.length; j++) {
                if (arrays[i] === arrays[j]) {
                    arrays.splice(j, 1);
                    j--
                }
            }
        }
        return arrays;
    }
    let arrays = [1, 22, 5, 3, 5, 24, 1]
    const results = removeDuplicate([...arrays])
    console.log(removeDuplicate(results))
    return (
        <>
            <h1>NEW</h1>
        </>
    )
}