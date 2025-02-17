const extractValue = (val: unknown): unknown => {
    if (typeof val === 'object' && val !== null && 'name' in val) {
      return (val as any).name;
    }
    return val;
};

export default extractValue;