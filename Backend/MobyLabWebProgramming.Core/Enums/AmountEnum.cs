using Ardalis.SmartEnum;
using Ardalis.SmartEnum.SystemTextJson;
using System.Text.Json.Serialization;

namespace MobyLabWebProgramming.Core.Enums;

/// <summary>
/// This is and example of a smart enum, you can modify it however you see fit.
/// Note that the class is decorated with a JsonConverter attribute so that it is properly serialized as a JSON.
/// </summary>
[JsonConverter(typeof(SmartEnumNameConverter<AmountEnum, string>))]
public sealed class AmountEnum : SmartEnum<AmountEnum, string>
{
    public static readonly AmountEnum NotEnough = new (nameof(NotEnough), "NotEnough");
    public static readonly AmountEnum Enough = new (nameof(Enough), "Enough");
    public static readonly AmountEnum MoreThanEnough = new (nameof(MoreThanEnough), "MoreThanEnough");

    private AmountEnum(string name, string value) : base(name, value)
    {
    }
}
