import Image from "next/image";
import Link from "next/link";

function CardItem({ product: { _id, image, name, description } }) {
  return (
    <Link href={`product/${_id.toString()}`} passHref>
      <div className="card mt-4" style={{ cursor: "pointer" }}>
        <Image src={image.url} height={400} width={500} alt={description} />
        <div className="card-body">
          <h5 className="card-title">{name.toUpperCase()}</h5>
        </div>
      </div>
    </Link>
  );
}

export default CardItem;
