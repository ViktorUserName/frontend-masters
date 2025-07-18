import { useEffect, useState } from "react";
import Pizza from "./Pizza";

const intl = new Intl.NumberFormat("en-Us", {
  style: "currency",
  currency: "USD",
});

export default function Order() {
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [pizzaType, setPizzaType] = useState(null);
  const [pizzaSize, setPizzaSize] = useState("M");
  const [loading, setLoading] = useState(true);

  let price, selectedPizza;

if (!loading) {
  selectedPizza = pizzaTypes.find((pizza) => pizza.id == pizzaType);

  price = intl.format(
  selectedPizza.sizes ? selectedPizza.sizes[pizzaSize] : "",
);
}

  console.log(selectedPizza, price)

   async function fetchPizzaTypes() {
    try {
      const pizzasRes = await fetch("/api/pizzas");
      const pizzasJson = await pizzasRes.json();
      setPizzaTypes(pizzasJson);
      // Устанавливаем ID первой пиццы из списка как значение по умолчанию
      if (pizzasJson.length > 0) {
        setPizzaType(pizzasJson[0].id);
      }
      setLoading(false);
    } catch (error) { // важно передать error в catch
      console.error(error);
    }
  }

  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  return (
    <div className="order">
      <h2>Create order</h2>
      <form action="">
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza type</label>
            <select
              onChange={(e) => setPizzaType(e.target.value)}
              name="pizza-type"
              value={pizzaType}
            >
              {pizzaTypes.map((pizza) => (
                <option value={pizza.id} key={pizza.id}>
                  {pizza.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pizza-size">Pizza Size</label>
            <div>
              <span>
                <input
                  type="radio"
                  checked={pizzaSize === "S"}
                  name="pizza-size"
                  value="S"
                  id="pizza-s"
                  onChange={(e) => setPizzaSize(e.target.value)}
                />
                <label htmlFor="pizza-s">Small</label>
              </span>
              <span>
                <input
                  type="radio"
                  checked={pizzaSize === "M"}
                  name="pizza-size"
                  value="M"
                  id="pizza-m"
                  onChange={(e) => setPizzaSize(e.target.value)}
                />
                <label htmlFor="pizza-m">Medium</label>
              </span>
              <span>
                <input
                  type="radio"
                  checked={pizzaSize === "L"}
                  name="pizza-size"
                  value="L"
                  id="pizza-l"
                  onChange={(e) => setPizzaSize(e.target.value)}
                />
                <label htmlFor="pizza-l">Large</label>
              </span>
            </div>
          </div>
          <button type="submit">Add to Cart</button>
        </div>
        {loading  ? (
          <h3>LOADING …</h3>
        ) : (
          <div className="order-pizza">
            <Pizza
              name={selectedPizza.name}
              description={selectedPizza.description}
              image={selectedPizza.image_url}
            />
            <p>{price}</p>
          </div>
        )}
      </form>
    </div>
  );
}
